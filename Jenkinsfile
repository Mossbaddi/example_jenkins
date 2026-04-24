pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    parallelsAlwaysFailFast()
    buildDiscarder(logRotator(numToKeepStr: "20"))
  }

  environment {
    IMAGE_NAME = "task-api"
    DEPLOY_URL = "http://host.docker.internal:3000"
  }

  stages {
    stage("Install") {
      steps {
        dir("app") {
          sh '''
            if [ -f package-lock.json ]; then
              npm ci
            else
              echo "package-lock.json absent -> fallback npm install"
              npm install
            fi
          '''
        }
      }
    }

    stage("Quality") {
      parallel {
        stage("Lint") {
          steps {
            dir("app") {
              sh "npm run lint"
            }
          }
        }

        stage("Tests") {
          steps {
            dir("app") {
              sh "npm run test:coverage"
            }
          }
        }
      }
    }

    stage("Build Docker image") {
      steps {
        sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest app"
      }
    }

    stage("Deploy local") {
      steps {
        sh "chmod +x scripts/deploy-local.sh scripts/smoke-test.sh"
        sh "./scripts/deploy-local.sh ${IMAGE_NAME}:${BUILD_NUMBER}"
      }
    }

    stage("Smoke test") {
      steps {
        sh "./scripts/smoke-test.sh ${DEPLOY_URL}"
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: "app/coverage/**", allowEmptyArchive: true
    }
    success {
      echo "Pipeline verte : application deployee et verifiee."
    }
    failure {
      echo "Pipeline en echec : analyser les logs du stage en erreur."
    }
  }
}
