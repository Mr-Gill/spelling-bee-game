#!/bin/bash
set -e

echo "Installing Playwright browsers..."

# Parse arguments (defaulting to chromium only)
BROWSERS="${@:-chromium}"
echo "Browsers to install: $BROWSERS"

# Get the Playwright version
PLAYWRIGHT_VERSION=$(node -p "require('./package.json').devDependencies['@playwright/test']")
echo "Playwright version: $PLAYWRIGHT_VERSION"

# Browser build versions for Playwright 1.48.0
declare -A BROWSER_VERSIONS
BROWSER_VERSIONS[chromium]="1140"
BROWSER_VERSIONS[firefox]="1466"
BROWSER_VERSIONS[webkit]="2104"

install_browser() {
    local browser=$1
    local browser_version=${BROWSER_VERSIONS[$browser]}
    
    if [ -z "$browser_version" ]; then
        echo "✗ Unknown browser: $browser"
        return 1
    fi
    
    echo "Installing $browser (build $browser_version)..."
    
    # Try normal installation first
    npx playwright install $browser 2>&1 | tee /tmp/playwright-install-${browser}.log || true
    
    # Check if installation was successful by looking for the marker file
    if [ -f ~/.cache/ms-playwright/${browser}-${browser_version}/INSTALLATION_COMPLETE ]; then
        echo "✓ $browser installation successful"
        return 0
    fi
    
    # If marker doesn't exist, check if we hit the RangeError and do manual install
    if grep -q "RangeError: Invalid count value" /tmp/playwright-install-${browser}.log; then
        echo "⚠ Detected RangeError for $browser, trying manual installation..."
        
        local download_url="https://playwright.azureedge.net/builds/${browser}/${browser_version}/${browser}-linux.zip"
        
        echo "Downloading from: $download_url"
        
        # Create cache directory
        mkdir -p ~/.cache/ms-playwright/${browser}-${browser_version}
        
        # Download with curl
        cd ~/.cache/ms-playwright
        curl -L -# -o ${browser}-${browser_version}.zip "$download_url"
        
        # Extract
        echo "Extracting $browser..."
        unzip -q ${browser}-${browser_version}.zip -d ${browser}-${browser_version}
        
        # Create marker file
        touch ${browser}-${browser_version}/INSTALLATION_COMPLETE
        
        # Cleanup
        rm ${browser}-${browser_version}.zip
        
        echo "✓ $browser manual installation successful"
        return 0
    fi
    
    echo "✗ $browser installation failed"
    return 1
}

# Install system dependencies if needed
if [[ "$@" == *"--with-deps"* ]]; then
    echo "Installing system dependencies..."
    npx playwright install-deps chromium firefox webkit || true
    # Remove --with-deps from browser list
    BROWSERS=$(echo "$@" | sed 's/--with-deps//g')
fi

# Install each browser
for browser in $BROWSERS; do
    install_browser "$browser"
done

echo "✓ All browsers installed successfully"
