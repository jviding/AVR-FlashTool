default:
	# Compile for attiny85 with warnings, optimizations, and 1 MHz clock frequency
	avr-gcc -Wall -Os -DF_CPU=1000000 -mmcu=attiny85 -o hello.o hello.c
	avr-objcopy -j .text -j .data -O ihex hello.o hello.hex
	avrdude -p attiny85 -c linuxspi -P /dev/spidev0.0 -U flash:w:hello.hex:i -b 10000

clean: /dev/null
	rm -f hello.o hello.hex