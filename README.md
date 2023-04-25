# News feed with endless news loading

### The news feed is written using a **react** (public part), **angular** (admin part) and **php/laravel** (backend). Main features:

- Articles don't load all at once. Articles are loaded when the scroll approaches the bottom of the browser screen.
- Articles consist of a title and a body. The body can contain text, links and images in any order and in any quantity
- Each article has a category. The list of categories is received from the server
- An article can contain multiple tags
- It is possible to sort the display by categories and tags
- Search by the content of articles is implemented
- There is a section of recommended articles. Recommended articles come from the server

It is possible to create an account on the site. Registration provides the following advantages:

- Ability to set categories that will be ignored. Articles with the selected categories will not be displayed, and the
  selected categories will disappear from the category list.
- Ability to set tags that will be ignored. Articles containing such tags will not be displayed

The ability to change the user's name and password is implemented. The user with ID 1 is an administrator. Also,
the administrator's authorization will not be saved when the page is reloaded for security

Known disadvantages:
- Since there is no email server, password recovery has a formal form
- Big design problems
- HTTP request error tracking has not been implemented yet

## Installation

Clone the repository by running the following command in your terminal:

```bash
git clone https://github.com/alexindima/NewsFeed.git
```

#### Backend (php/laravel)

****Prerequisites:****

PHP >= 7.3
Composer
MySQL
Git

**Installation**
Navigate to the admin-angular directory:

```bash
cd NewsFeed/api-laravel
```

Install the project dependencies by running the following command:

```bash
composer install
```

Copy the .env.example file to .env

```bash
cp .env.example .env
```

Update the .env file with your database credentials and other settings

```makefile
APP_NAME=NewsFeed
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost
APP_PORT=8000
SANCTUM_STATEFUL_DOMAINS="localhost:4200,localhost:8000"

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret

SESSION_SECURE_COOKIE=false
SESSION_DRIVER=cookie
SESSION_LIFETIME=240
SESSION_DOMAIN="localhost"
```
Update the DB_DATABASE, DB_USERNAME, and DB_PASSWORD variables to match your MySQL database credentials.

Generate a new application key

```bash
php artisan key:generate
```

Run the database migrations

```bash
php artisan migrate
```

**Running the application**
To run the application, run the following command:

```bash
php artisan serve
```

Once the application has compiled successfully, application runs on  http://localhost:4200/admin/

#### Admin part (angular)
Before you begin, you will need to have the following installed on your system:
- Node.js and NPM
- Angular CLI
- Git

**Installation**
Navigate to the admin-angular directory:

```bash
cd NewsFeed/admin-angular
```

Install the project dependencies by running the following command:

```bash
npm install
```

**Running the application**
To run the application, run the following command:

```bash
npm run start
```

or

```bash
ng serve --proxy-config proxy.conf.json
```

Once the application has compiled successfully, open your browser and navigate to http://localhost:4200/admin/



#### Publuc part (react)
Install the project dependencies by running the following command:

```bash
npm install
```

**Running the application**
To run the application, run the following command:

```bash
npm run start
```

Once the application has compiled successfully, open your browser and navigate to http://localhost:3000/

