;*** This program is written for Attiny85 ***
; Blink multiple LEDs with a high frequency.
; Modifying the pulse width allows dimming the LEDs between dark and bright.
; LEDs are connected to:
;   - PB0 (OC0A / pin 5)
;   - PB1 (OC0B / pin 6)
;   - PB3 (OC1B inverted / pin 2)
;   - PB4 (OC1B non-inverted / pin 3)

.nolist
.include "tn85def.inc"
.list

.equ  AddrR20 = 0x0014  ; SRAM address of R20
.equ  AddrR21 = 0x0015  ; SRAM address of R21
.equ  AddrR22 = 0x0016  ; SRAM address of R22

main:
  ldi R16, (1<<PB0 | 1<<PB1 | 1<<PB3 | 1<<PB4)
  out DDRB, R16     ; Set PBx as output to enable PWM generation    
timer0:
  ldi R16, (1<<CS01) 
  out TCCR0B, R16   ; Prescaler to /8
  ldi R16, 85
  out OCR0A, R16    ; Set counter TOP for OC0A
  ldi R16, 165
  out OCR0B, R16    ; Set counter TOP for OC0B
  ldi R16, (1<<WGM00 | 1<<WGM01 | 1<<COM0A1 | 1<<COM0B1 | 1<<COM0A0 | 1<<COM0B0)
  out TCCR0A, R16   ; Fast PWM with 0xFF as TOP in inverting mode (clear at BOTTOM)
timer1:
  ldi R16, (1<<CS12)
  out TCCR1, R16    ; Prescaler to /8 (to match with timer0)
  ldi R16, 245    
  out OCR1B, R16    ; Set counter TOP for OC1B
  ldi R16, 255
  out OCR1C, R16    ; Set counter TOP to 0xFF (to match with timer0)
  ldi R16, (1<<PWM1B | 1<<COM1B0)
  out GTCCR, R16    ; Fast PWM with OCR1C as TOP

dimmer:
  ldi R20, 1        ; OCR0A (+1 to brighten, -1 to darken)
  ldi R21, 1        ; OCR0B (+1 to brighten, -1 to darken)
  ldi R22, 1        ; OCR1B (PB4 is PB3 inverted)
loop:
  rcall pause
  rcall led1
  rcall led2
  rcall led3
    rjmp loop

led1:                   ; PB0
  in R16, OCR0A
  add R16, R20          ; Brighten or darken
  out OCR0A, R16        ; Write new OCR0A
  ldi XL, LOW(AddrR20)  
  ldi XH, HIGH(AddrR20) ; Set X-pointer to R20
  rcall update
    ret

led2:                   ; PB1
  in R16, OCR0B
  add R16, R21          ; Brighten or darken
  out OCR0B, R16        ; Write new OCR0B
  ldi XL, LOW(AddrR21)  
  ldi XH, HIGH(AddrR21) ; Set X-pointer to R21
  rcall update
    ret

led3:                   ; PB3 & PB4 inversed
  in R16, OCR1B
  add R16, R22          ; Brighten or darken
  out OCR1B, R16        ; Write new OCR1B
  ldi XL, LOW(AddrR22)  
  ldi XH, HIGH(AddrR22) ; Set X-pointer to R22
  rcall update
    ret

update:
  cpi R16, 0
    brne continue   ; If BOTTOM not reached then continue
  ldi R17, 1
  st X, R17         ; Else start brightening     
continue:
  cpi R16, 255      
    brne end        ; If TOP not reached then end
  ldi R17, 255      ; 255 equals -1 in 8-bit systems
  st X, R17         ; Else start darkening
end:
    ret

pause:
    in R16, TIFR        ; Read timer
    andi R16, (1<<TOV1) ; Check overflow flag
      breq pause        ; Until overflow flag is set
    ldi R16, (1<<TOV1)
    out TIFR, R16       ; Reset overflow flag
      ret