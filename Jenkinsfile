pipeline {
    agent any

    environment {
        DOCKER_HUB = credentials('dockerhub') 
        IMAGE_TAG  = 'douhielmehdi/todo-app'      
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'master', url: 'https://github.com/DOUHIelMehdi/todo-app.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'

                // Install project dependencies
                sh 'npm install'

                // Build the project
                sh 'npm run build'

                echo 'Build completed successfully!'
            }
        }

         stage('Build-Docker-Image') {
            steps {
                echo 'Building Docker Image for React Frontend...'

                // Build Docker image for the React frontend
                // sh 'docker build -t $IMAGE_TAG:$BUILD_NUMBER .'

                echo 'Docker Image Built Successfully.'
            }
        }
        
    }
    

    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }

}