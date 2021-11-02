;*** This program is written for Attiny85 ***
; Use timer/counter to blink an LED which is connected to PB3 (pin 2)

.nolist
.include "tn85def.inc"
.list

main:
    ldi R16, (1<<PB3)
    out DDRB, R16       ; Set PB3 as output

    ldi R16, (1<<CS02 | 1<<CS00)
    out TCCR0B, R16     ; Set timer prescaler to /1024

    ; As clock is 1Mhz, prescaler gives us 1Mhz/1024 = 976hz
    ; Timer/counter is 8 bit, so one loop has 255 steps
    ; Thus, the led is toggled every 255/976hz = 0.26s

loop:
    rcall toggle
    rcall pause
      rjmp loop

toggle:
    ldi R16, (1<<PB3)
    in R17, PortB       ; Read Port B
    eor R17, R16        ; Toggle PB3
    out PortB, R17      ; Write Port B
      ret

pause:
plupe:
    in R16, TIFR        ; Read timer
    andi R16, (1<<TOV0) ; Check overflow flag
      breq plupe        ; Until overflow flag is set
    ldi R16, (1<<TOV0)
    out TIFR, R16       ; Reset overflow flag
      ret
