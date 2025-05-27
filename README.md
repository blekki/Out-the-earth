# Out-the-earth
Out the earth - a website for finding the constellations on a map.
Peer into the dark expanse and experience the deep mystery of our universe.

## Installation

### First step
For a first step clone repository in your chosen folder.
```
git clone https://github.com/blekki/Out-the-earth.git
```

### Prepare (and a local server)
For a correct work on a general system (especially as Firefox) you need have a server. This is caused by a browser's protection system, which doesn't allow you to run a separate script file from your project's folders without an agent like **http/https**. 

Why does this cause stress? Because the project uses separate files for better coding and updating. This is the reason why everyone needs to follow these instructions.

How does it work? The code contains a link to a separate file with an important part of the code. But the browser reject a command to use it because thinks it can be dangerous for your shared files on the internet. So, you can't use standart ways call file; you need a **URl**.

Example: Two different ways to call a separate file.
1. **Standart** (wrong): `./user/documents/my_project/script.js`
2. **URL** (fine): `http://127.0.0.1:5500/script.js`

But without a server you can't create a **URl**, so lets use a simplest solution: a local server. Of course, you can use a global server as well as a local server. In these instructions, I've written rules on how to run a local server. If you want start it on a global one, check next URL "[How to host your own website](https://www.liquidweb.com/blog/host-your-own-website/)" or similar internet resources.

Solution:
1. Open **VSCode** with already cloned reposetory. Go to the extantions tab and install the **Live Server** extantion. If you want to read about this extation, check [page](https://marketplace.visualstudio.com/items/?itemName=ritwickdey.LiveServer).
2. In right-bottom corney a button **"Go Live"** should appear. Click on it.
3. You did it! Now everything should works nicely.

PS: You can try this step with a **Visual Studio**, but I don't know what will happen, so... improvise, I belive in you.

## Run script
In your project folder, run one of the following commands in the console (choose your browser):
1. Firefox: `firefox OutTheEarth.html`
2. Chrome: `google-chrome OutTheEarth.html`
3. Microsoft Edge: `microsoft-edge OutTheEarth.html`