; *** This program is written for Atmega88 ***
; Virtual SRAM module with 4 bit address range
; Constantly outputs the addressed memory
; PB0:7 - Data in
; PD0:7 - Data out
; PC0:3 - Memory address in
; PC4   - Write enable

.nolist
.include "m88def.inc"
.list

init:
  ldi R16, 0b00000000   ; 0x00
  out DDRB, R16         ; PB0:7 low for input
  out DDRC, R16         ; PC0:4 low for input
  ldi R16, 0b11111111   ; 0xFF
  out DDRD, R16         ; PD0:7 high for output

main:
  ldi R20, 0b00001111 ; 0x0F

loop:
  call setPointer ; Set SRAM address
  call dataOut    ; Read from SRAM
  sbic PINC, 4    ; Skip if PC4 low 
  call dataIn     ; Write to SRAM
    rjmp loop

setPointer:
  in R26, PINC    ; Read PC0:4 to XL
  and R26, R20    ; Use only PC0:3 (memory address in)
    ret

dataOut:
  ld R16, X       ; Load from SRAM
  out PORTD, R16  ; Write data out (PD0:7)
    ret

dataIn:
  in R17, PINB    ; Read data in (PB0:7)
  cp R17, R16     ; Same as output?
  brne continue   ; If not, continue
    ret
continue:
  st X, R17       ; Write to SRAM
    ret