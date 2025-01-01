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
                sh 'docker build -t $IMAGE_TAG:$BUILD_NUMBER .'

                echo 'Docker Image Built Successfully.'
            }
        }

       stage('Scan-Docker-Image') {
            steps {
                script {
                    // Ensure Docker Scout is installed
                    sh '''
                    if ! [ -f /usr/local/bin/docker-scout ]; then
                        echo "Installing Docker Scout..."
                        curl -sSfL https://raw.githubusercontent.com/docker/scout-cli/main/install.sh | sh -s -- -b /usr/local/bin
                    fi
                    '''

                    // Login to Docker Hub
                    sh '''
                    echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USR --password-stdin
                    '''

                    // Verify Docker image exists
                    sh '''
                    if ! docker pull $IMAGE_TAG:$BUILD_NUMBER; then
                        echo "Docker image $IMAGE_TAG:$BUILD_NUMBER does not exist. Exiting scan."
                        exit 1
                    fi
                    '''

                    // Run Docker Scout scan
                    try {
                        echo 'Scanning Docker image for vulnerabilities...'
                        sh '''
                        docker-scout cves $IMAGE_TAG:$BUILD_NUMBER
                        '''
                        echo 'Scanning complete.'
                    } catch (Exception e) {
                        echo "Scan failed: ${e.message}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }


        stage('Push-Docker-Image') {
            steps {
                echo 'Pushing Docker Image to DockerHub...'

                // Push Docker image to DockerHub
                sh 'docker push $IMAGE_TAG:$BUILD_NUMBER'

                echo 'Docker Image Pushed Successfully.'
            }
        }
        
    }
    

    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }

}