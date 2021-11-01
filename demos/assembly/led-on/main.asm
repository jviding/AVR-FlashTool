;*** This program is written for Attiny85 ***
; Turn on an LED which is connected to PB3 (pin 2)

.include "tn85def.inc"

    ldi R16, 0b00001000 ; Load address of PB3
    out DDRB, R16       ; Set up PB3 on Port B
    out PortB, R16      ; Add voltage to Port B

start:
    rjmp start          ; Loop forever