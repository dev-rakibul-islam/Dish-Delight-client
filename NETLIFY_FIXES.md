# Netlify Next.js Routing & Reload Problem Solutions

## Common Issues & Fixes

### 1. **404 on Page Reload / URL Direct Access**

**Problem:** Pages work when navigated via links but show 404 when refreshing or accessing directly  
**Solution:** The `netlify.toml` file in the root is already configured. No additional action needed.

**Location:** `/dishdelight-client/netlify.toml`

---

### 2. **Build Command Issues**

**Problem:** Deployment fails with build errors

**Fix:** Ensure in Netlify dashboard:

```
Base directory: dishdelight-client
Build command: npm run build
Publish directory: .next
```

---

### 3. **Environment Variables Not Working**

**Problem:** `NEXT_PUBLIC_*` variables are undefined

**Solution:**

1. Go to Netlify Dashboard → Settings → Build & deploy → Environment
2. Add: `NEXT_PUBLIC_API_URL=https://your-server.vercel.app`
3. Redeploy the site

**Important:** Only variables prefixed with `NEXT_PUBLIC_` work in the browser!

---

### 4. **API Routes Not Working**

**Problem:** API calls to server return CORS errors

**Solution:**

1. Update server's `CLIENT_ORIGIN` environment variable on Vercel
2. Set it to your Netlify domain: `https://your-site.netlify.app`
3. Restart Vercel deployment

**In your client code:**

```javascript
// Use the environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Make requests
const response = await fetch(`${API_URL}/api/endpoint`);
```

---

### 5. **Images Not Loading**

**Problem:** Images from `next/image` component fail to load

**Solution:** Ensure `next.config.mjs` has proper image domains:

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "cristianonew.ukrdevs.com",
    },
  ],
}
```

---

### 6. **Cookies/Authentication Issues**

**Problem:** Cookies not persisting between requests

**Solution:** In your API calls, add:

```javascript
fetch(`${API_URL}/endpoint`, {
  credentials: "include", // Include cookies
  headers: {
    "Content-Type": "application/json",
  },
});
```

**Also ensure server has proper CORS:**

```javascript
app.use(
  cors({
    origin: "https://your-site.netlify.app",
    credentials: true,
  })
);
```

---

### 7. **Styles/CSS Not Loading**

**Problem:** CSS works locally but not on Netlify

**Solution:**

- Ensure Tailwind CSS build process completes
- Check `globals.css` is imported in `src/app/layout.js`
- Clear Netlify cache: Dashboard → Deploys → Clear cache and redeploy

---

### 8. **Slow Page Loads / Performance**

**Problem:** Site is slow on Netlify

**Solution:**

- Use `next/image` for image optimization
- Enable static generation where possible
- Check build output size
- Use `npm run build` locally to verify

---

## Deployment Checklist

- [ ] `netlify.toml` exists in `dishdelight-client` root
- [ ] Environment variables set in Netlify dashboard
- [ ] `NEXT_PUBLIC_API_URL` points to Vercel server
- [ ] Server's `CLIENT_ORIGIN` includes Netlify domain
- [ ] Tested locally: `npm run build && npm start`
- [ ] Clear Netlify cache and redeploy

---

## Testing After Deployment

1. **Test direct URL access:**

   ```
   https://your-site.netlify.app/
   https://your-site.netlify.app/all-items
   https://your-site.netlify.app/item/123
   ```

2. **Test page refresh:** Press F5 on different pages

3. **Test API calls:** Open browser console and check for errors

4. **Test authentication:** Try login/register flow

---

## Netlify Dashboard Quick Actions

### View Logs

- Dashboard → Deploys → Click latest → View logs

### Clear Cache

- Dashboard → Deploys → Trigger deploy → Clear cache and redeploy

### Check Environment Variables

- Dashboard → Site settings → Build & deploy → Environment

### Test Build Locally

```bash
cd dishdelight-client
npm run build
npm start
```

---

## Additional Resources

- [Netlify Next.js Guide](https://docs.netlify.com/frameworks/next-js/overview/)
- [Next.js Deployment](https://nextjs.org/docs/deployment/netlify)
- [Netlify TOML Reference](https://docs.netlify.com/configure-builds/file-based-configuration/)

---

## If Still Having Issues

1. **Check deployment logs** for build errors
2. **Verify environment variables** are set correctly
3. **Test locally first:** `npm run dev`
4. **Clear browser cache** (Ctrl+Shift+Delete)
5. **Try hard refresh** (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
6. **Check GitHub Actions** for any CI/CD issues
7. **Contact Netlify support** with deployment logs
