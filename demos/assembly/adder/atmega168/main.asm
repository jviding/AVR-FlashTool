;*** This program is written for Atmega168 ***
; 7-bit Adder with Carry
; Input1: PB0:5
; Input2: PC0:5
; Output: PD0:6 where PD6 is Carry

.nolist
.include "m168def.inc"
.list

main:
  ldi R16, 0b00000000   ; 0x00
  out DDRB, R16         ; PB0:5 low to use as input
  out DDRC, R16         ; PC0:5 low to use as input
  ldi R16, 0b00111111   ; 0x4F
  out DDRD, R16         ; PD0:6 high to use as output

loop:
  in R16, PINB    ; Read in PB0:5 = 0x00bb_bbbb
  in R17, PINC    ; Read in PC0:5 = 0x00cc_cccc
  add R16, R17    ; Sum PB0:5 + PC0:5 = PD0:6
  out PORTD, R16  ; Write out PD0:6 = 0x0ddd_dddd
    rjmp loop
