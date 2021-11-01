;*** This program is written for Attiny85 ***
; Blink an LED which is connected to PB3 (pin 2)

.nolist
.include "tn85def.inc"
.list

main:
    ldi R16, 0b00001000 ; PB3 address
    out DDRB, R16       ; Set PB3 as output
loop:
    rcall toggle
    rcall delay
    rjmp loop

toggle:
    in R17, PortB       ; Read Port B
    eor R17, R16        ; Toggle PB3
    out PortB, R17      ; Write Port B
    RET

delay:
    ldi R24, 6
    ldi R25, 19
    ldi R26, 174
dell:
    dec R26
    BRNE dell
    dec R25
    BRNE dell
    dec R24
    BRNE dell
    RET
