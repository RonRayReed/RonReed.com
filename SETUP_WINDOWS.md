# Setting Up RonReed.com on Windows

This guide walks you through every step needed to run your website on your Windows computer.
No prior development experience is required — each step is explained in plain language.

---

## Should I use Docker?

**Yes, and this guide uses Docker.** Since you already have Docker Desktop installed,
it is the easiest approach: you do not need to install Node.js or manage software
versions yourself. One command starts the entire website.

---

## What This Guide Sets Up

| What | Where you'll access it |
|---|---|
| **Your website** (the resume) | http://localhost:3000 |
| **Strapi admin** (where you add your content) | http://localhost:1337/admin |

---

## Part 1 — Software You Need

### 1.1 Make Sure Docker Desktop Is Running

1. Look at the bottom-right corner of your screen (the system tray, near the clock).
2. Find the **Docker whale icon** 🐳.
3. If you see it, Docker Desktop is running. **Good — skip to step 1.2.**
4. If you do NOT see it, go to your Start Menu, search for **Docker Desktop**, and open it.
5. Wait until the whale icon appears and stops animating. This can take 1–2 minutes.

> **Why Docker?** Docker is like a mini-computer inside your computer. It runs the website
> software in an isolated box so you don't have to install anything else.

---

### 1.2 Install Git for Windows

Git is the tool that downloads the project files from GitHub to your computer.

1. Open your web browser and go to: **https://git-scm.com/download/win**
2. The download should start automatically. If not, click **"Click here to download"**.
3. Run the downloaded installer (it will be named something like `Git-2.xx.x-64-bit.exe`).
4. Click **Next** on every screen — the default options are all correct.
5. Click **Install**, then **Finish**.

**Verify Git installed correctly:**
1. Press the **Windows key**, type `PowerShell`, and press **Enter**.
2. In the black/blue window that opens, type this and press Enter:
   ```
   git --version
   ```
3. You should see something like `git version 2.47.0.windows.1`.
   If you do, Git is installed correctly.

---

## Part 2 — Download the Project Files

### 2.1 Open PowerShell

1. Press the **Windows key**.
2. Type `PowerShell` and press **Enter**.
3. A blue or black window will open. This is where you type commands.

> **What is PowerShell?** It is a text-based way to control your computer.
> You type a command and press Enter to run it.

---

### 2.2 Choose Where to Save the Project

Decide where on your computer you want to keep the project. The Desktop is fine.

In PowerShell, type the following to go to your Desktop:
```
cd "$env:USERPROFILE\Desktop"
```
Press **Enter**.

If you prefer a different location (e.g., your Documents folder), use:
```
cd "$env:USERPROFILE\Documents"
```

---

### 2.3 Download the Project from GitHub

In PowerShell, type this command and press **Enter**:
```
git clone https://github.com/ronrayreed/ronreed.com.git
```

You will see lines of text appear as Git downloads the files.
When it finishes, you will be back at the command prompt (`PS ...>`).

Now navigate into the project folder:
```
cd ronreed.com
```

> **What just happened?** Git created a folder called `ronreed.com` on your Desktop
> (or wherever you chose) and downloaded all the project files into it.

---

## Part 3 — Start the Application

### 3.1 Start Everything with One Command

Make sure you are in the `ronreed.com` folder in PowerShell (you should see it in the prompt).
Type this command and press **Enter**:

```
docker compose up --build
```

> **What does this do?** Docker reads the project files and builds two mini-computers
> (called "containers") — one for the Strapi CMS backend, one for the Next.js website.

---

### 3.2 Wait for the First Build (10–20 Minutes)

⚠️ **The first time takes a long time. This is normal.**

You will see a lot of text scrolling by. Here is what is happening:
- Docker is downloading Node.js and installing all the software packages.
- Strapi is building its admin panel (this is the slow part).

**Signs that it is still working (not frozen):**
- Text keeps appearing in the window.
- You may see lines like `compiling...`, `Building admin panel`, `webpack compiled`.

**Signs that it is ready:**
Look for these two messages (they may not appear in this exact order):

From the **backend** (Strapi):
```
[2024-xx-xx] info: ⚡ Server started in ...ms
```
or
```
Welcome back!
To manage your project 🚀, go to the administration panel at: http://localhost:1337/admin
```

From the **frontend** (Next.js):
```
✓ Ready in ...ms
```
or
```
▲ Next.js ...
- Local: http://localhost:3000
```

⛔ **Do NOT close this PowerShell window.** The servers run inside it.
Open a **new** PowerShell window for any other commands.

---

## Part 4 — Set Up Strapi Admin (First Time Only)

You only do this section once, the very first time.

### 4.1 Create Your Admin Account

1. Open your web browser.
2. Go to: **http://localhost:1337/admin**
3. You will see a "Welcome to Strapi!" page asking you to create an account.
4. Fill in:
   - **First name** and **Last name** — your name
   - **Email** — your email address
   - **Password** — a password you will remember (at least 8 characters with a number and letter)
5. Click **Let's start**.

> This account is only for your local computer. It is not connected to the internet.

---

### 4.2 Enable Public Access to Your Content (Required)

By default, Strapi keeps all content private. You must tell it to allow your website
to read the content. Follow these steps exactly:

1. In the Strapi admin, look at the left sidebar.
2. Click **Settings** (the gear icon ⚙️, near the bottom of the sidebar).
3. In the Settings menu, find the section called **Users & Permissions Plugin**.
4. Click **Roles**.
5. Click on **Public** (the row in the table).
6. You will see a long list of content types. For each of the following, expand it
   and check the boxes next to **find** and **findOne**:

   - **Education**
   - **Experience**
   - **Profile**
   - **Project**
   - **Skill**
   - **Social**

   To expand each one: click the name of the content type to reveal its checkboxes.
   Check ✅ **find** and ✅ **findOne** for all six.

7. Click the **Save** button in the top-right corner.

> **Why is this needed?** Strapi acts as a locked filing cabinet. By default,
> only logged-in admins can see the files. Checking "find" and "findOne" tells
> Strapi it is okay for your website (running at localhost:3000) to read the content.

---

## Part 5 — Add Your Resume Content

Now you will add your actual information. Go back to **http://localhost:1337/admin**.

In the left sidebar, click **Content Manager**. You will see your content types listed.

---

### 5.1 Add Your Profile

Your profile is a single entry — it is your resume's header (your name, title, bio, etc.).

1. In the Content Manager, click **Profile**.
2. Click **Edit** (or the entry if one already exists, otherwise fill in the form).
3. Fill in the fields:
   - **fullName** — Your full name (e.g., `Ron Reed`)
   - **title** — Your professional title (e.g., `Software Engineer` or `Marketing Manager`)
   - **bio** — A short paragraph about yourself (2–4 sentences)
   - **email** — Your email address
   - **phone** — Your phone number (optional)
   - **location** — Your city and state (e.g., `Atlanta, GA`)
   - **website** — Your personal website URL (optional)
   - **avatar** — Click **+ Add an asset** to upload a professional photo (optional)
4. In the top-right, click **Save**.
5. Then click **Publish** to make it visible on your website.

> ⚠️ **Important: You must click both Save AND Publish.** Saved entries are drafts
> and will NOT show on your website until they are published.

---

### 5.2 Add Work Experience

1. In the Content Manager, click **Experience**.
2. Click **+ Create new entry**.
3. Fill in:
   - **role** — Your job title (e.g., `Senior Developer`)
   - **company** — Company name
   - **location** — City, State (optional)
   - **startDate** — When you started (click the calendar icon)
   - **endDate** — When you left (leave blank if current job)
   - **isCurrent** — Check this box ✅ if this is your current job
   - **description** — Describe your responsibilities (you can use bullet points)
   - **skills** — Skills used in this role. Enter them as a JSON array:
     `["JavaScript", "React", "Node.js"]`
   - **sortOrder** — Controls the display order. Use `1` for most recent, `2` for next, etc.
4. Click **Save**, then **Publish**.
5. Repeat for each job.

---

### 5.3 Add Education

1. Click **Education** in the Content Manager.
2. Click **+ Create new entry**.
3. Fill in:
   - **institution** — School name (e.g., `Georgia Tech`)
   - **degree** — Degree type (e.g., `Bachelor of Science`)
   - **field** — Field of study (e.g., `Computer Science`)
   - **location** — City, State (optional)
   - **startDate** — Start year
   - **endDate** — End/graduation year
   - **description** — Any honors, activities, or notes (optional)
   - **sortOrder** — Order (most recent = lowest number)
4. Click **Save**, then **Publish**.

---

### 5.4 Add Skills

1. Click **Skill** in the Content Manager.
2. Click **+ Create new entry** for each skill.
3. Fill in:
   - **name** — The skill name (e.g., `JavaScript`, `Project Management`, `Photoshop`)
   - **category** — Choose from the dropdown:
     `Frontend`, `Backend`, `Database`, `DevOps`, `Mobile`, `Design`, `Tools`, `Other`
   - **level** — Optional, 1 (beginner) to 5 (expert)
   - **sortOrder** — Order within the category
4. Click **Save**, then **Publish**.
5. Add as many skills as you want. They will be grouped by category on your website.

---

### 5.5 Add Projects

1. Click **Project** in the Content Manager.
2. Click **+ Create new entry**.
3. Fill in:
   - **title** — Project name
   - **description** — What the project does (1–3 sentences)
   - **technologies** — Technologies used, as a JSON array: `["React", "Python"]`
   - **liveUrl** — Link to the live project (optional)
   - **repoUrl** — Link to the GitHub repo (optional)
   - **featured** — Check ✅ if this is a highlight project
   - **image** — Upload a screenshot (optional)
   - **sortOrder** — Display order
4. Click **Save**, then **Publish**.

---

### 5.6 Add Social Media Links

1. Click **Social** in the Content Manager.
2. Click **+ Create new entry** for each social profile.
3. Fill in:
   - **platform** — Choose from the dropdown (LinkedIn, GitHub, Twitter, etc.)
   - **url** — The full URL to your profile (e.g., `https://linkedin.com/in/yourname`)
   - **handle** — Your username on that platform (optional, e.g., `@ronreed`)
   - **sortOrder** — Display order
4. Click **Save**, then **Publish**.

---

## Part 6 — View Your Website

Open your browser and go to: **http://localhost:3000**

You should see your resume with all the content you just added. 🎉

If the page looks empty or shows a setup message, double-check:
- You clicked **Publish** (not just Save) for each entry in Strapi.
- You enabled **find** permissions in Part 4.2.

Try refreshing the page. If it still looks empty, see the Troubleshooting section below.

---

## Part 7 — Daily Use

### 7.1 Starting the Application Each Day

1. Make sure Docker Desktop is running (whale icon in system tray).
2. Open PowerShell.
3. Navigate to your project:
   ```
   cd "$env:USERPROFILE\Desktop\ronreed.com"
   ```
   *(Adjust the path if you saved it somewhere other than the Desktop.)*
4. Start the servers:
   ```
   docker compose up
   ```
   *(Notice: no `--build` this time. It starts much faster — usually 1–2 minutes.)*
5. Wait until you see the "Ready" messages, then open your browser.

---

### 7.2 Stopping the Application

In the PowerShell window where the servers are running:
1. Press **Ctrl + C** on your keyboard.
2. Type `Y` and press **Enter** if it asks you to confirm.

Or from a different PowerShell window, navigate to the project folder and run:
```
docker compose down
```

> **Your content is safe.** Stopping Docker does not delete anything.
> All your Strapi content is saved in a Docker "volume" that persists between sessions.

---

## Troubleshooting

### "Docker is not recognized" or Docker commands don't work
- Make sure Docker Desktop is open and the whale icon is visible in the system tray.
- Try restarting Docker Desktop and then opening a new PowerShell window.

### The first build seems stuck / no new text for 5+ minutes
- Strapi building the admin panel can pause at `webpack compiled` for several minutes.
- Wait at least 20 minutes before concluding something is wrong.
- If you are sure it is frozen, press **Ctrl + C** to stop, then run `docker compose up --build` again.

### Website shows "Strapi CMS" setup message (no content)
- Make sure you clicked **Publish** (not just Save) on your Strapi entries.
- Make sure you enabled **find** permissions for Public role (Part 4.2).
- Try a hard refresh: press **Ctrl + Shift + R** in your browser.

### "port is already allocated" error
Another program is using port 1337 or 3000. Stop the conflicting program, or:
1. Run `docker compose down`
2. Then run `docker compose up` again.

### Lost your Strapi admin password
1. Stop the containers: `docker compose down`
2. Remove the database volume: `docker volume rm ronreedcom_strapi-db`

   ⚠️ **This deletes all your Strapi content.** You will need to re-enter everything.
3. Start again: `docker compose up`
4. Create a new admin account (Part 4.1).

### Everything looks broken after a Windows restart
Docker Desktop sometimes needs a minute to fully start after Windows boots.
Wait for the whale icon to appear and stop animating, then run `docker compose up` again.

---

## Quick Reference Card

| Task | Command (run in PowerShell from the `ronreed.com` folder) |
|---|---|
| First-time start | `docker compose up --build` |
| Daily start | `docker compose up` |
| Stop | `docker compose down` or Ctrl+C |
| View your website | Open browser → http://localhost:3000 |
| Manage content | Open browser → http://localhost:1337/admin |
