# Futbol Atlası: Kariyer Efsanesi - Native PowerShell TCP HTTP Server
# Serves game files on port 3000 over Wi-Fi without requiring Admin rights.

$port = 3000

# Detect local IP address (prefers Wi-Fi or Ethernet IPv4)
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
    $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" 
} | Select-Object -First 1).IPAddress

if (-not $ip) {
    $ip = "127.0.0.1"
}

# Create a TCP Listener on all network interfaces
$address = [System.Net.IPAddress]::Any
$listener = New-Object System.Net.Sockets.TcpListener($address, $port)
$listener.Start()

Write-Host ""
Write-Host '==================================================' -ForegroundColor Green
Write-Host '== FUTBOL ATLASI: YEREL TCP SUNUCUSU ==' -ForegroundColor Green
Write-Host '==================================================' -ForegroundColor Green
Write-Host 'Sunucu basariyla baslatildi!' -ForegroundColor Green
Write-Host "Bilgisayarda Oynamak Icin:  http://localhost:${port}" -ForegroundColor Cyan
Write-Host '--------------------------------------------------'
Write-Host 'Telefondan Oynamak Icin (Ayni Wi-Fi):' -ForegroundColor Yellow
Write-Host "URL: http://${ip}:${port}" -ForegroundColor Yellow
Write-Host '==================================================' -ForegroundColor Green
Write-Host 'Durdurmak icin bu terminali veya gorevi kapatin.' -ForegroundColor Gray
Write-Host ""

$localPath = Get-Location

# Listen loop
while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        
        # Set short timeout to prevent hanging
        $client.ReceiveTimeout = 2000
        $client.SendTimeout = 2000

        $reader = New-Object System.IO.StreamReader($stream)
        $requestLine = $reader.ReadLine()

        if ($null -eq $requestLine) {
            $client.Close()
            continue
        }

        # Parse request line: e.g., "GET /index.html HTTP/1.1"
        $parts = $requestLine -split " "
        if ($parts.Length -lt 2) {
            $client.Close()
            continue
        }

        $method = $parts[0]
        $urlPath = $parts[1]

        # Read remaining headers until empty line
        while ($null -ne ($line = $reader.ReadLine()) -and $line.Trim() -ne "") {}

        # Default path
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }

        # Strip query parameters if any (e.g. ?v=1.2)
        if ($urlPath.Contains("?")) {
            $urlPath = $urlPath.Substring(0, $urlPath.IndexOf("?"))
        }

        # Convert to local filepath
        $urlPath = $urlPath.Replace("/", "\")
        $filePath = Join-Path $localPath $urlPath

        # Serve file
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Mime types
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = "application/octet-stream"
            
            if ($ext -eq ".html") { $mime = "text/html; charset=utf-8" }
            elseif ($ext -eq ".css") { $mime = "text/css; charset=utf-8" }
            elseif ($ext -eq ".js") { $mime = "application/javascript; charset=utf-8" }
            elseif ($ext -eq ".json") { $mime = "application/json; charset=utf-8" }
            elseif ($ext -eq ".png") { $mime = "image/png" }
            elseif ($ext -eq ".jpg") { $mime = "image/jpeg" }
            elseif ($ext -eq ".ico") { $mime = "image/x-icon" }

            $writer = New-Object System.IO.StreamWriter($stream)
            $writer.WriteLine("HTTP/1.1 200 OK")
            $writer.WriteLine("Content-Type: $mime")
            $writer.WriteLine("Content-Length: $($bytes.Length)")
            $writer.WriteLine("Connection: close")
            $writer.WriteLine("")
            $writer.Flush()

            $stream.Write($bytes, 0, $bytes.Length)
        } else {
            # 404 response
            $writer = New-Object System.IO.StreamWriter($stream)
            $writer.WriteLine("HTTP/1.1 404 Not Found")
            $writer.WriteLine("Content-Type: text/plain")
            $writer.WriteLine("Connection: close")
            $writer.WriteLine("")
            $writer.Write("File Not Found")
            $writer.Flush()
        }

        $client.Close()
    } catch {
        # Catch connection resets silently and continue
        if ($null -ne $client) {
            $client.Close()
        }
    }
}
