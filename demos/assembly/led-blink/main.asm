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

delay:                  ; Clock is 1Mhz = 1.000.000 cycles / second
    ldi R24, 6          ; +1 cycle
    ldi R25, 19         ; +1 cycle
    ldi R26, 174        ; +1 cycle
dell:                   
    dec R26     ; First: 173*(1+2)+(1+1) = +521 cycles
    BRNE dell   ; Then: (1+2)+254*(1+2)+(1+1) = +767 cycles
    dec R25     ; First: (521+1+2)+17*(767+1+2)+(767+1+1) = +14.383 cycles
    BRNE dell   ; Then: (767+1+2)+254*(767+1+2)+(767+1+1) = +197.119 cycles
    dec R24     ; (14383+1+2)+4*(197119+1+2)+(197119+1+1) = +999.995 cycles
    BRNE dell   ; Total is 999.995 + 3 (ldi) + 3 (ret) = +1.000.001 cycles
    RET         ; Thus, delay is cycles/clock = 1000001/1000000 = 1s
