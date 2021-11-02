;*** This program is written for Attiny85 ***
; Blink an LED with a high frequency for a dimming effect.
; LED is connected to PB3 (OC1B / pin 2).

.nolist
.include "tn85def.inc"
.list

main:
    ldi R16, (1<<CS12 | 1<<CS10)
    out TCCR1, R16          ; Set timer-1 prescaler to /16

    ldi R16, 190            ; Set counter compare value
    out OCR1B, R16          ; LOW when 0-190, HIGH when 190-199

    ldi R16, 199
    out OCR1C, R16          ; Set counter TOP (with /16 prescaler gives 20kHz)

    ldi R16, (1<<PB3)
    out DDRB, R16           ; Set PB3(OC1B) as output to enable PWM generation

    ldi R16, (1<<PWM1B | 1<<COM1B0)
    out GTCCR, R16          ; Set timer-1 to PWM Mode with output from PB3(OC1B)

loop:
    rjmp loop
