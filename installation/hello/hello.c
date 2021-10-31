#include <avr/io.h>
#include <util/delay.h>

#define LED         PB3 // Pin 2
#define DELAY_MS    500

int main() {
    uint8_t high = 0;
    uint16_t ms = 0;

    // Set LED pin for output in port B's direction register
    DDRB |= (1 << LED);

    // Set LED pin LOW
    PORTB &= ~(1 << LED);

    while(1) {
        
        high = !high;

        if (high) {
            // Set LED pin HIGH
            PORTB |= (1 << LED);
        } else {
            // Set LED pin LOW
            PORTB &= ~(1 << LED);
        }

        // Delay for 500ms
        for (ms = DELAY_MS; ms > 0; ms -= 10) {
            _delay_ms(10);
        }
    }

    return 0;
}