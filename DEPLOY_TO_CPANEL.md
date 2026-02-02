# Deploying a Next.js Application to cPanel

This guide provides step-by-step instructions for deploying a Next.js application to a standard cPanel hosting environment. cPanel is not designed for Node.js applications out-of-the-box, so this process involves a few workarounds to get your application running correctly.

## Prerequisites

Before you begin, ensure you have the following:

*   **cPanel Hosting with Node.js Support:** Your hosting plan must include the "Setup Node.js App" feature. If you don't see this option in your cPanel dashboard, contact your hosting provider to enable it.
*   **SSH Access:** You will need SSH access to your server to run commands. You can usually set this up in the "SSH Access" section of your cPanel.
*   **A working Next.js application:** Your application should be running correctly on your local machine.

---

## Step 1: Build the Next.js Application

First, you need to create a production build of your Next.js application. This will generate an optimized version of your app in a `.next` directory.

Run the following command in your project's root directory:

```bash
npm run build
```

This will create a `.next` folder containing the production build of your application.

---

## Step 2: Prepare the Server Files

To run your Next.js application on cPanel, you need a custom server file to handle the requests. Create a file named `server.js` in the root of your project with the following content:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

This file will start a Node.js server that serves your Next.js application.

---

## Step 3: Upload to cPanel

Next, you need to upload your project files to your cPanel hosting. You can do this using the cPanel File Manager or an FTP client like FileZilla.

1.  **Compress your project:** Create a ZIP archive of your project, including the following files and directories:
    *   `.next`
    *   `node_modules`
    *   `public`
    *   `package.json`
    *   `package-lock.json` (or `yarn.lock`)
    *   `next.config.js`
    *   `server.js`

2.  **Upload the ZIP file:** Log in to your cPanel, open the **File Manager**, navigate to the directory where you want to host your application (e.g., `public_html/my-next-app`), and upload the ZIP file.

3.  **Extract the files:** Once uploaded, right-click the ZIP file and select **Extract**.

---

## Step 4: Set Up the Node.js Application in cPanel

Now, you need to configure cPanel to run your Next.js application.

1.  **Open "Setup Node.js App":** In your cPanel dashboard, find and open the **Setup Node.js App** tool.

2.  **Create a new application:** Click the **Create Application** button and fill out the form:
    *   **Node.js version:** Select the latest available version.
    *   **Application mode:** Set to **Production**.
    *   **Application root:** Enter the path to your project directory (e.g., `/home/your_username/public_html/my-next-app`).
    *   **Application URL:** Choose the domain or subdomain you want to use for your app.
    *   **Application startup file:** Enter `server.js`.

3.  **Click Create:** cPanel will set up the application and create a `passenger_wsgi.py` file, which is used to run the Node.js server.

---

## Step 5: Install Dependencies

After creating the application, you need to install the project dependencies on the server.

1.  **Open the terminal:** In the **Setup Node.js App** section, find your newly created application and click **Open** to access the application's dashboard.

2.  **Run npm install:** In the application dashboard, you will see a command to enter the virtual environment. Copy this command and paste it into your SSH terminal. Then, run `npm install` to install the dependencies:

    ```bash
    # Example command from cPanel
    source /home/your_username/nodevenv/public_html/my-next-app/16/bin/activate
    cd /home/your_username/public_html/my-next-app
    npm install
    ```

---

## Step 6: Configure .htaccess for Port Forwarding

By default, your Node.js application will run on a specific port (e.g., 3000), but you need to make it accessible through the standard HTTP (80) and HTTPS (443) ports. You can do this by adding rewrite rules to your `.htaccess` file.

1.  **Edit `.htaccess`:** In your cPanel File Manager, navigate to the `public_html` directory (or the root of your application's domain) and edit the `.htaccess` file. If it doesn't exist, create a new one.

2.  **Add the rewrite rules:** Add the following code to your `.htaccess` file, replacing `3000` with the port your application is running on:

    ```apache
    RewriteEngine On
    RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
    ```

---

## Step 7: Start the Application

Finally, go back to the **Setup Node.js App** page in cPanel and click the **Start App** button for your application.

Your Next.js application should now be running on your cPanel hosting. You can access it through the URL you configured.

## Troubleshooting

*   **503 Service Unavailable:** This error usually means your Node.js application failed to start. Check the application logs in the **Setup Node.js App** section for more details.
*   **Internal Server Error:** This could be caused by an issue in your Next.js application or an incorrect `.htaccess` configuration. Review your code and the rewrite rules.
*   **File Not Found:** Ensure that your application root and startup file are correctly configured in the Node.js setup.

By following these steps, you can successfully deploy and run your Next.js application on a cPanel hosting environment.