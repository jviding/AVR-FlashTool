;*** This program is written for Attiny85 ***
; Blink an LED with a high frequency.
; Modifying the pulse width allows dimming the LED between dark and bright.
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
    rcall brighten
    rcall darken
      rjmp loop

brighten:
    in R17, OCR1B       ; Read counter compare value
loop1:
    rcall pause
    inc R17             ; Increment counter compare value
    out OCR1B, R17      ; Write new counter compare value
    in R18, OCR1C       ; Read counter TOP value
    cp R18, R17         ; Compare TOP with ORC1B
      brne loop1        ; Loop if not equal
      ret

darken:
    in R17, OCR1B       ; Read counter compare value
loop2:
    rcall pause
    dec R17             ; Decrement counter compare value
    out OCR1B, R17      ; Write new counter compare value
    cpi R17, 0          ; Compare ORC1B to BOTTOM (zero)
      brne loop2        ; Loop if not equal
      ret

pause:
    in R16, TIFR        ; Read timer
    andi R16, (1<<TOV1) ; Check overflow flag
      breq pause        ; Until overflow flag is set
    ldi R16, (1<<TOV1)
    out TIFR, R16       ; Reset overflow flag
      ret