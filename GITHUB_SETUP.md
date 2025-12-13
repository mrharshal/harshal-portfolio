# GitHub Push Guide

Follow these steps to push your code to GitHub:

## Step 1: Initialize Git (if not already done)
```bash
cd c:\Users\HARSHAL\Desktop\portfolio\haershals-portfolio
git init
```

## Step 2: Add all files
```bash
git add .
```

## Step 3: Make your first commit
```bash
git commit -m "Initial commit: Portfolio website"
```

## Step 4: Create a new repository on GitHub
1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `haershals-portfolio` (or any name you prefer)
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 5: Connect local repository to GitHub
After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/haershals-portfolio.git

# Or if you prefer SSH:
# git remote add origin git@github.com:YOUR_USERNAME/haershals-portfolio.git
```

## Step 6: Push to GitHub
```bash
# Push to main branch
git branch -M main
git push -u origin main
```

## If you get authentication error:
1. Use GitHub Personal Access Token instead of password
2. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token with `repo` permissions
4. Use token as password when pushing

## Alternative: Using GitHub CLI (easier)
```bash
# Install GitHub CLI if not installed
# Then simply:
gh repo create haershals-portfolio --public --source=. --remote=origin --push
```

---

**Note**: Make sure you're in the project directory before running these commands!
