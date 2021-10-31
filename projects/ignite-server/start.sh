mkdir ignite_dir

docker run -d \
  --restart=always \
  --name ignite-a \
  -p 10800:10800 \
  -p 47100:47100 \
  -v ${PWD}/ignite_dir:/storage \
  -v ${PWD}/ignite_config.xml:/config-file.xml \
  -e IGNITE_WORK_DIR=/storage \
  -e CONFIG_URI=/config-file.xml \
  apacheignite/ignite
