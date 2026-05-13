@echo off
echo === Setting up Scrollytelling Project ===

REM Create directories
if not exist "src\app\fonts" mkdir "src\app\fonts"
if not exist "public\frames" mkdir "public\frames"

REM Copy font
echo Copying font...
copy "..\JAK_ARTA.otf" "src\app\fonts\JAK_ARTA.otf" /Y

REM Copy frames
echo Copying 40 animation frames...
copy "..\Animação HERO\*" "public\frames\" /Y

REM Install dependencies
echo Installing dependencies...
call npm install

echo === Setup complete! Run 'npm run dev' to start. ===
