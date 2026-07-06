using UnityEngine;

/// <summary>
/// Unity C# controller script for smooth Touch/Swipe gameplay in a 2D/2.5D mobile football game.
/// Handles Tap-to-Pass and Swipe-to-Shoot with visual trajectory feedback.
/// </summary>
public class PlayerInputController : MonoBehaviour
{
    [Header("Gameplay Objects")]
    [SerializeField] private Rigidbody2D ballRigidbody;
    [SerializeField] private Transform playerTransform;

    [Header("Input Configurations")]
    [SerializeField] private float maxSwipeDrag = 150f; // Maximum drag length in pixels
    [SerializeField] private float minSwipeDrag = 20f;  // Minimum drag length to register as a swipe
    [SerializeField] private float passRaycastRadius = 1f; // Target detection radius for passing
    
    [Header("Physics Multipliers")]
    [SerializeField] private float shootForceMultiplier = 15f;
    [SerializeField] private float passForceMultiplier = 10f;

    [Header("Visual Trajectory")]
    [SerializeField] private LineRenderer trajectoryLine;
    [SerializeField] private Color trajectoryColor = Color.white;

    private Vector2 touchStartPos;
    private bool isDragging = false;
    private Camera mainCamera;

    private void Start()
    {
        mainCamera = Camera.main;
        if (trajectoryLine != null)
        {
            trajectoryLine.enabled = false;
            trajectoryLine.positionCount = 2;
            
            // Set line styling
            trajectoryLine.startWidth = 0.08f;
            trajectoryLine.endWidth = 0.02f;
            trajectoryLine.material = new Material(Shader.Find("Sprites/Default"));
            trajectoryLine.startColor = trajectoryColor;
            trajectoryLine.endColor = new Color(trajectoryColor.r, trajectoryColor.g, trajectoryColor.b, 0f);
        }
    }

    private void Update()
    {
        HandleTouchInput();
    }

    private void HandleTouchInput()
    {
        // Check for mobile touches or mouse inputs (works in Unity Editor too)
        if (Input.GetMouseButtonDown(0))
        {
            OnTouchStarted(Input.mousePosition);
        }
        else if (Input.GetMouseButton(0) && isDragging)
        {
            OnTouchMoved(Input.mousePosition);
        }
        else if (Input.GetMouseButtonUp(0) && isDragging)
        {
            OnTouchEnded(Input.mousePosition);
        }
    }

    private void OnTouchStarted(Vector2 screenPosition)
    {
        // Only allow input when the ball is close to the player (in actual gameplay)
        if (Vector2.Distance(playerTransform.position, ballRigidbody.transform.position) > 1.5f)
        {
            isDragging = false;
            return;
        }

        touchStartPos = screenPosition;
        isDragging = true;
    }

    private void OnTouchMoved(Vector2 screenPosition)
    {
        if (trajectoryLine == null) return;

        Vector2 dragVector = screenPosition - touchStartPos;
        float dragDistance = dragVector.magnitude;

        if (dragDistance > minSwipeDrag)
        {
            // Activate the visual line helper for shooting
            trajectoryLine.enabled = true;

            // Clamp drag distance for consistent power control
            Vector2 clampedDrag = Vector2.ClampMagnitude(dragVector, maxSwipeDrag);
            
            // Convert to world space to show where the shot will go
            Vector3 ballPosition = ballRigidbody.transform.position;
            Vector3 targetDir = new Vector3(-clampedDrag.x, -clampedDrag.y, 0f).normalized; 
            float powerNormalized = clampedDrag.magnitude / maxSwipeDrag;

            // Draw line from ball towards target trajectory
            trajectoryLine.SetPosition(0, ballPosition);
            trajectoryLine.SetPosition(1, ballPosition + targetDir * (powerNormalized * 3f)); // Line length visual indicator
        }
        else
        {
            trajectoryLine.enabled = false;
        }
    }

    private void OnTouchEnded(Vector2 screenPosition)
    {
        isDragging = false;
        if (trajectoryLine != null) trajectoryLine.enabled = false;

        Vector2 dragVector = screenPosition - touchStartPos;
        float dragDistance = dragVector.magnitude;

        if (dragDistance < minSwipeDrag)
        {
            // Short touch: Trigger TAP-TO-PASS
            ExecuteTapPass(screenPosition);
        }
        else
        {
            // Long Swipe: Trigger SWIPE-TO-SHOOT
            ExecuteSwipeShoot(dragVector);
        }
    }

    private void ExecuteTapPass(Vector2 screenPosition)
    {
        // Project screen touch into world position
        Vector3 worldTouchPos = mainCamera.ScreenToWorldPoint(new Vector3(screenPosition.x, screenPosition.y, Mathf.Abs(mainCamera.transform.position.z)));
        worldTouchPos.z = 0; // Lock to 2D plane

        // Raycast / Circle overlap check to see if we tapped a teammate
        Collider2D hitCollider = Physics2D.OverlapCircle(worldTouchPos, passRaycastRadius);
        
        if (hitCollider != null && hitCollider.CompareTag("Teammate"))
        {
            Debug.Log("Pass target acquired: " + hitCollider.gameObject.name);
            
            // Calculate pass vector and apply force to the ball
            Vector2 passDirection = (hitCollider.transform.position - ballRigidbody.transform.position).normalized;
            float passDistance = Vector2.Distance(hitCollider.transform.position, ballRigidbody.transform.position);

            // Apply custom pass force scaled by distance
            ballRigidbody.velocity = Vector2.zero; // Clear inertia
            ballRigidbody.AddForce(passDirection * (passDistance * passForceMultiplier), ForceMode2D.Impulse);
            
            // Trigger animation/mechanics to pass the ball
        }
        else
        {
            Debug.Log("Tap did not hit a teammate.");
        }
    }

    private void ExecuteSwipeShoot(Vector2 dragVector)
    {
        // Clamping the drag vector to limit max shooting force
        Vector2 clampedDrag = Vector2.ClampMagnitude(dragVector, maxSwipeDrag);
        
        // Invert vector for intuitive sling-shot mechanics OR use direct swipe direction.
        // We use direct inverted vector here (dragging backward shoots forward) like an angry birds slingshot.
        // For direct swipe (dragging forward shoots forward), remove the minus signs.
        Vector2 shootDirection = new Vector2(-clampedDrag.x, -clampedDrag.y).normalized;
        float forcePercent = clampedDrag.magnitude / maxSwipeDrag;

        float finalForce = forcePercent * shootForceMultiplier;

        // Apply force to the ball
        ballRigidbody.velocity = Vector2.zero; // Clear inertia
        ballRigidbody.AddForce(shootDirection * finalForce, ForceMode2D.Impulse);

        Debug.Log($"Shot executed! Direction: {shootDirection}, Force Percent: {forcePercent * 100}%");
    }

    private void OnDrawGizmosSelected()
    {
        // Draw helper circle to visualize pass targeting in editor
        Gizmos.color = Color.green;
        Gizmos.DrawWireSphere(transform.position, passRaycastRadius);
    }
}
