FROM clojure:openjdk-8-lein

#CMD apt update && apt install build-essential -y

#CMD mkdir /avr \
#    && cd /avr \
#    && git clone https://github.com/Ro5bert/avra.git \
#    && cd avra \
#    && make \
#    && make install