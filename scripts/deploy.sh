ENV=${1:-prod}

case $ENV in
  test)
    export CF_MANIFEST="./manifest-test.yml"
    ;;
  prod)
    export CF_MANIFEST="./manifest.yml"
    ;;
  *)
    echo "🐝 Usage: scripts/test.sh [test|prod]"
    exit 1
    ;;
esac

cf push -p package/archive.zip -f $CF_MANIFEST