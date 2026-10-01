Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Projects\challenge #2\public\logo.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 0) {
            # Make white with original alpha
            $newColor = [System.Drawing.Color]::FromArgb($pixel.A, 255, 255, 255)
            $newBmp.SetPixel($x, $y, $newColor)
        } else {
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$bmp.Dispose()

$destinations = @(
    "C:\Projects\challenge #2\public\logo-white.png",
    "C:\Projects\challenge #2\public\sites\shillstore\root\images\logo-shill-white.png",
    "C:\Projects\challenge #2\public\sites\erigostore-co-id\root\images\logo-shill-white.png"
)

foreach ($dest in $destinations) {
    $dir = [System.IO.Path]::GetDirectoryName($dest)
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $newBmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Output "Saved white logo to $dest"
}

$newBmp.Dispose()
Write-Output "Done generating white logos!"
