; *** This program is written for Attiny26 ***
; 4 bit program counter
; Constantly outputs the counter value
;
; Note:
;   CPU uses the internal clock 
;   PB6/Clock is not an actual clock
;   Thus, its high must be long enough
;   Otherwise, it may not be detected
;
; PA0:3 - Data in
; PB0:3 - Data out
; PB4   - Read in
; PB5   - Count enable
; PB6   - Clock
;
; Upon a clock high:
; - Read in (PB4) sets Data in (PA0:3) as the new counter value
; - Count enable (PB5) increments the counter value by one

.nolist
.include "tn26def.inc"
.list

init:
  ldi R16, 0b00000000 ; 0x00
  out DDRA, R16       ; PA0:3 low for input
  out DDRB, R16       ; PB4:6 low for input
  ldi R16, 0b00001111 ; 0x0F
  out DDRB, R16       ; PB0:3 high for output

main:
  ldi R16, 0b00000000 ; 0x00 - Count from zero
  ldi R17, 0b01010001 ; 0x51 - Read: Enabled
  ldi R18, 0b01100001 ; 0x61 - Count: Enabled

loop:
  sbic PINB, 4    ; Skip if not reading
    rcall tryRead  ;   Read new counter value
  sbic PINB, 5    ; Skip if not counting
    rcall tryCount ;   Increment counter value
  sbis PINB, 6    ; Skip if clock high
    rcall enable   ;   Enable read & count
    rjmp loop

tryRead:
  ldi R20, 0b01010000 ; 0x50 for PB4, PB6
  in R21, PINB        ; Read PB0:7
  and R21, R20        ; Take PB4, PB6
  inc R21             ; Set read state
  cpse R21, R17       ; Skip if read enabled
    ret
read:
  ldi R17, 0b01010000 ; 0x50 - Read: Disabled
  ldi R21, 0b00001111 ; 0x0F for PA0:3
  in R22, PINA        ; Read PA0:7
  and R22, R21        ; Take PA0:3
  mov R16, R22        ; Set as counter value
    ret

tryCount:
  ldi R20, 0b01100000 ; 0x60 for PB5:6
  in R21, PINB        ; Read PB0:7
  and R21, R20        ; Take PB5:6
  inc R21             ; Set count state
  cpse R21, R18       ; Skip if should count
    ret
count:
  ldi R18, 0b01100000 ; 0x60 - Count: Disabled
  ldi R21, 0b00001111 ; 0x0F - Counter max bits
  inc R16             ; Counter +1
  and R16, R21        ; Prevent overflow
    ret

enable:
  ldi R17, 0b01010001 ; 0x51 - Read: Enabled
  ldi R18, 0b01100001 ; 0x61 - Count: Enabled
  ret

