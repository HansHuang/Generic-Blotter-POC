# import in js file
cd app

if grep -q 'demo-lib' index.js; then echo 'lib is already imported'; else sed -i '1i\import { menus } from "demo-lib"' index.js; fi


# import in package.json

if grep -q 'demo-lib' package.json; 
then 
    echo 'lib is already in dependencies'; 
else 
    npm link demo-lib -S
    npm i
fi


