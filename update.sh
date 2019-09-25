STATIC=~/code/yearpixels.github.io

rm $STATIC/* -rv
npm run build
mv build/* $STATIC/
rm -rv build
pushd $STATIC
git add .
git commit -m " Updating static website"

read -p "Push to remote repository? (Y/N): " confirm
if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]
then
  git push origin master
fi

read -p "Run server to check the changes? (Y/N): " confirm
if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]
then
  echo Visit the website at http://localhost:8088
  python -m http.server 8088
fi

popd