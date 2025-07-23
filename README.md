# To-Do Task Web Application

This project is a small to-do task web application with a React frontend, Node.js/Express backend, and PostgreSQL database, all containerized with Docker.

## Features

* **Create Tasks:** Users can add new to-do tasks with a title and an optional description.
* **List Recent Tasks:** Displays the 5 most recently created, active (uncompleted) tasks.
* **Mark as Completed:** Users can mark tasks as completed, removing them from the active list.

## Architecture

The application is structured into three main components:

* **Frontend (React.js):** A Single Page Application (SPA) that provides the user interface.
* **Backend (Node.js/Express.js):** A RESTful API that handles business logic and communicates with the database.
* **Database (PostgreSQL):** Stores all task data.

## Tech Stack

* **Database:** PostgreSQL
* **Backend:** JavaScript, Node.js, Express.js
* **Frontend:** React, Bootstrap
* **Containerization:** Docker, Docker Compose

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* **Docker:** Ensure Docker Desktop (or Docker Engine and Docker Compose) is installed on your Linux development environment.
    * [Install Docker Engine](https://docs.docker.com/engine/install/)
    * [Install Docker Compose](https://docs.docker.com/compose/install/)
* **Bash and GNU tools:** Standard on most Linux distributions.

### Installation and Running the Project

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Navigate to the project root:**
    Make sure you are in the directory containing `docker-compose.yml`, `backend/`, and `frontend/` folders.

3.  **Build and Run Docker Containers:**
    This command will build the Docker images for the frontend and backend, start all three services (PostgreSQL, Backend, Frontend), and initialize the database schema.

    ```bash
    docker-compose up --build -d
    ```
    * `--build`: Rebuilds images even if they exist (useful for fresh installs or code changes).
    * `-d`: Runs the containers in detached mode (in the background).

4.  **Verify Services:**
    You can check the status of your running containers:
    ```bash
    docker-compose ps
    ```
    You should see `db`, `backend`, and `frontend` containers running.

5.  **Access the Application:**
    Open your web browser and navigate to:
    ```
    http://localhost
    ```
    The frontend application should be accessible. The backend API will be running on `http://localhost:5000`.

---

![System Architecture](https://drive.google.com/uc?export=view&id=1F589tOjNZHExlpJg_3SyAQGzrPS9pmWD)

## Testing 🧪

This project includes backend tests (unit and integration) to ensure the API and database interactions work as expected.

### Running Backend Tests

**Execute the tests** once inside the container's shell:

* **Run all backend tests:**
        ```bash
        npm test
        ```
* **Run only unit tests:**
        ```bash
        npm run test:unit
        ```
* **Run only integration tests:**
        ```bash
        npm run test:integration
        ```

**Exit the container shell:**
    ```bash
    exit
    ```

**Restart the backend service** to continue using the application:
    ```bash
    docker-compose start backend
    ```

---

### Stopping the Project

To stop and remove all containers, networks, and volumes created by `docker-compose`:

```bash
docker-compose down -v
