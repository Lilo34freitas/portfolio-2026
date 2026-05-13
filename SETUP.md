# Setup Instructions

## Step 1: Copy Assets

Open your terminal in the project root (`portfolio-murilo`) and run these commands:

```powershell
# Create font directory
mkdir -p scrollytelling\src\app\fonts

# Copy font
copy "JAK_ARTA.otf" "scrollytelling\src\app\fonts\JAK_ARTA.otf"

# Create frames directory
mkdir -p scrollytelling\public\frames

# Copy all 40 frames
copy "Animação HERO\*" "scrollytelling\public\frames\"
```

## Step 2: Install Dependencies

```powershell
cd scrollytelling
npm install
```

## Step 3: Run Dev Server

```powershell
npm run dev
```

The app will be available at `http://localhost:3000`.
