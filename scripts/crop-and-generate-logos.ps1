Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\USer\Downloads\1bbd00aa-3590-4fa2-9d43-5e97a2486efe.png"
$origBmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Bounding box found:
# minX: 288, maxX: 1795 (w: 1508)
# minY: 222, maxY: 512 (h: 291)
$minX = 280
$minY = 215
$cropW = 1525
$cropH = 305

# Ensure within bounds
if ($minX + $cropW -gt $origBmp.Width) { $cropW = $origBmp.Width - $minX }
if ($minY + $cropH -gt $origBmp.Height) { $cropH = $origBmp.Height - $minY }

$rect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
$croppedBlack = $origBmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Create white version
$croppedWhite = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $p = $croppedBlack.GetPixel($x, $y)
        if ($p.A -gt 0) {
            $whiteColor = [System.Drawing.Color]::FromArgb($p.A, 255, 255, 255)
            $croppedWhite.SetPixel($x, $y, $whiteColor)
        } else {
            $croppedWhite.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$origBmp.Dispose()

# Save black logos
$blackDests = @(
    "C:\Projects\challenge #2\public\logo.png",
    "C:\Projects\challenge #2\public\sites\shillstore\root\images\logo.png",
    "C:\Projects\challenge #2\public\sites\shillstore\root\images\logo-shill-black.png",
    "C:\Projects\challenge #2\public\sites\erigostore-co-id\root\images\logo.png",
    "C:\Projects\challenge #2\public\sites\erigostore-co-id\root\images\logo-shill-black.png"
)

foreach ($dest in $blackDests) {
    $croppedBlack.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Output "Saved black cropped logo to $dest"
}

# Save white logos
$whiteDests = @(
    "C:\Projects\challenge #2\public\logo-white.png",
    "C:\Projects\challenge #2\public\sites\shillstore\root\images\logo-shill-white.png",
    "C:\Projects\challenge #2\public\sites\erigostore-co-id\root\images\logo-shill-white.png"
)

foreach ($dest in $whiteDests) {
    $croppedWhite.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Output "Saved white cropped logo to $dest"
}

$croppedBlack.Dispose()
$croppedWhite.Dispose()

Write-Output "Done generating tightly-cropped black and white logos!"
