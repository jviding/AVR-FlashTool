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
  in R16, PINC    ; Read memory address in
  and R16, R20    ; Take last 4 bits (PC0:3)
  ldi XL, R16     ; Set X as pointer to SRAM
    ret

dataOut:
  ld R16, X       ; Load from SRAM
  out PORTD, R16  ; Write data out
    ret

dataIn:
  in R16, PINB    ; Read data in
  st X, R16       ; Write to SRAM
    ret