## My Portfolio

This is a personal portfolio website built with HTML, CSS and JavaScript front end
Node.js, Express, and Nodemailer used in back side

## Features

- Responsive portfolio website
- Validate email existence by using HUNTER_API_KEY
- Contact form that sends emails using Gmail
- Modern design with animations
- More attractive by using animations
- Messages that are to be sent is validated if it is English word or not. If not, it will not be sent 

## Getting Started

Prerequisites
- Set up the environment 
- Creating folder and file by considering its hierarchy
- Node.js and npm installed
## Installation
1. Install dependencies:

   npm install

2. Create a `.env` file in the root directory and add:
   ```
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password generating gmail app password and replace it with your actual generated gmail app password
   Hint: don't share gmail app password to anyone by considering security case

3. Clone the repository:
- Push the code to github after all things are working well
- Create new repository in github
- Push the code by using terminal
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
  Example 
       - your_user_name = ketbogale
       - repository = Portfolio
       
4. Start the server:

   node server.js

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

- Deploy on [Render](https://render.com/), [Railway](https://railway.app/), or [Cyclic](https://www.cyclic.sh/)
- Set `EMAIL_USER` and `EMAIL_PASS` as environment variables in your hosting dashboard.

## License

MIT
