# Workshop 03 – Express Server

Completed Express web server using the supplied HTML and CSS files.

## Run

From the repository root:

```bash
cd starter
npm install
npm start
```

Open http://localhost:3000. Stop with Ctrl+C.

## Routes

| Route | Response |
| --- | --- |
| / | Home page |
| /about | About page |
| /contact | Contact page |
| /api/time | ISO datetime and timestamp in milliseconds |
| /api/info | Server name, version and Node.js version |
| /styles/style.css | Stylesheet |
| Unmatched URLs | Custom 404 page |

Static files use express.static(). HTML routes use res.sendFile().
API routes use Express Router mounted at /api. Request logging is enabled.
The 404 handler follows all routes, and the four-parameter 500 error handler
comes last. Both handlers fall back to a text response if their error page
cannot be sent.

## Validation

HTTP checks completed on 7 October 2026 with Node.js 24:
- Home, about and contact pages return HTML with status 200.
- CSS and favicon load successfully.
- API time returns JSON with consistent datetime and timestamp values.
- API info is reachable through the router.
- Unknown URLs return the custom 404 page with status 404.
- A temporarily missing about page triggers the custom 500 page.
- Temporarily missing error pages produce the expected text fallbacks.

Original files were restored after the error checks. No test-only endpoint
is included. node_modules is excluded from the submission; install dependencies
before running.
