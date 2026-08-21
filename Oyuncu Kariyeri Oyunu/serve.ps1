$port = 8080
$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "Localhost sunucusu hazir: http://localhost:$port/index.html"
    Write-Host "Vitrini Ac: http://localhost:$port/showcase.html"
} catch {
    $port = 8081
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Prefixes.Add("http://127.0.0.1:$port/")
    $listener.Start()
    Write-Host "Localhost sunucusu hazir: http://localhost:$port/index.html"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        
        $urlPath = [System.Uri]::UnescapeDataString($req.Url.LocalPath).TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath)) {
            $urlPath = "index.html"
        }
        
        $normPath = $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $fullPath = [System.IO.Path]::Combine($root, $normPath)
        
        if ([System.IO.File]::Exists($fullPath)) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = "application/octet-stream"
            switch ($ext) {
                ".html" { $mime = "text/html; charset=utf-8" }
                ".css"  { $mime = "text/css; charset=utf-8" }
                ".js"   { $mime = "application/javascript; charset=utf-8" }
                ".png"  { $mime = "image/png" }
                ".jpg"  { $mime = "image/jpeg" }
                ".jpeg" { $mime = "image/jpeg" }
                ".webp" { $mime = "image/webp" }
                ".svg"  { $mime = "image/svg+xml" }
                ".mp4"  { $mime = "video/mp4" }
                ".json" { $mime = "application/json; charset=utf-8" }
                ".wav"  { $mime = "audio/wav" }
                ".mp3"  { $mime = "audio/mpeg" }
            }
            $res.ContentType = $mime
            
            $fileBytes = [System.IO.File]::ReadAllBytes($fullPath)
            $res.ContentLength64 = $fileBytes.Length
            $res.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $res.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Bulunamadi: $urlPath")
            $res.ContentLength64 = $msg.Length
            $res.OutputStream.Write($msg, 0, $msg.Length)
        }
        $res.OutputStream.Close()
    } catch {
        # ignore error and keep listening
    }
}
