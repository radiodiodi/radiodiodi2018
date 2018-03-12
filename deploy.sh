echo "$PRIVATE_KEY" > key;
echo "$PUBLIC_KEY" > key.pub;
chmod 600 key;
eval "$(ssh-agent -s)";
ssh-add key;
ssh -oStrictHostKeyChecking=no -oBatchMode=yes "$DEPLOY_USER"@"$DEPLOY_SERVER" 'bash deploy_radiodiodi2018.sh';
