;*** This program is written for Attiny85 ***
; PB5 |pin1 U pin8| Vcc
; PB3 |pin2   pin7| PB2
; PB4 |pin3   pin6| PB1
; GND |pin4   pin5| PB0
;
; Takes 3x inputs PB0, PB1, PB4
; Outputs 1 bit sum PB3
; Outputs Carry bit PB2

.nolist
.include "tn85def.inc"
.list

main:
  cbi DDRB, PB0 ; Set low to use as input
  cbi DDRB, PB1 ;
  cbi DDRB, PB4 ;
  sbi DDRB, PB2 ; Set high to use as output
  sbi DDRB, PB3 ;

  ;ldi R16, 0b00011000
  ;out DDRB, R16                 ; PB1:2 as input, PB3:4 as output
  ;ldi R16, (1<<PB1) | (1<<PB2)
  ;out PORTB, R16                ; Activate pull-up

loop:
  ldi R16, 0      ; Set R16 = 0
  rcall readIn    ; Read inputs sum to R16
  rcall setOut    ; Set outputs sum to PortB
    rjmp loop     ; Repeat

readIn:
  sbic PINB, PB0  ; Skip if low
  inc R16         ; R16++
  sbic PINB, PB1  ; Skip if low
  inc R16         ; R16++
  sbic PINB, PB4  ; Skip if low
  inc R16         ; R16++
    RET           ; Now, R16 = sum

setOut:
  ldi R17, 0        ; Default all low
  ldi R18, (1<<PB3) ; Use PB3 (sum)
  rcall getOutput   ; Set PB3 value to R17
  ldi R18, (1<<PB2) ; Use PB2 (carry)
  rcall getOutput   ; Set PB2 value to R17
  out PORTB, R17    ; Update outputs
    RET

getOutput:
  clc             ; Clear Carry
  lsr R16         ; Shift right, Carry=Rd(0)
    brcc end      ; If Carry=0 then end
  or R17, R18     ; Else set high
end:
    RET
