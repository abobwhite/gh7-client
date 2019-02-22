pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building app image'
        sh 'docker system prune -af'
        sh 'docker build -t $DOCKER_IMAGE:latest .'
      }
    }
    stage('Tag') {
      when { branch 'master' }
      steps {
        echo 'Tagging and Pushing Latest Image'
        script {
          docker.withRegistry('', 'dockerhub-credentials') {
            sh "docker push $DOCKER_IMAGE:latest"
          }
        }
      }
    }
    stage('Deploy') {
      when { branch 'master' }
      steps {
        echo 'Deploying the latest code...'
        script {
          configFileProvider([configFile(fileId: "compose-file", variable: "COMPOSE_FILE")]) {
            sh "mv $COMPOSE_FILE $COMPOSE_LOCATION/docker-compose.yml"

            configFileProvider([configFile(fileId: 'compose-env', variable: 'ENV_FILE')]) {
              sh "mv $ENV_FILE $COMPOSE_LOCATION/.env"

              docker.withRegistry("", "dockerhub-credentials") {
                sh "docker-compose -f $COMPOSE_LOCATION/docker-compose.yml down"
                sh "docker-compose -f $COMPOSE_LOCATION/docker-compose.yml pull"
                sh "docker-compose -f $COMPOSE_LOCATION/docker-compose.yml up -d"
              }
            }
          }
        }
      }
    }
  }
  environment {
    DOCKER_IMAGE = "abobwhite/beacon-client"
    COMPOSE_LOCATION = "/tmp"
  }
}
