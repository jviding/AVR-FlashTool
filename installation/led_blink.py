# Run on RPi to test GPIO
import RPi.GPIO as GPIO
import time

PIN = 12

GPIO.setmode(GPIO.BOARD)
GPIO.setup(PIN, GPIO.OUT)
for i in range(5):
	GPIO.output(PIN, True)
	print("on")
	time.sleep(1)
	GPIO.output(PIN, False)
	print("off")
	time.sleep(1)
GPIO.cleanup()
