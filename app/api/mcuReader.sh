#!/bin/bash

AVR_FILES_PATH="/usr/local/include/avr/"
OUTPUT_FILE="mcuLibs.txt"

## SCRIPT

# Create output file or clear if exists
echo -n "[" > $OUTPUT_FILE
# Read AVR files
FILES=$(ls "$AVR_FILES_PATH" -1 | grep '.inc')

for FILE in $FILES
do
    FILE_PATH="${AVR_FILES_PATH}${FILE}"

    # Read line matching 'Target MCU' from file
    TARGET_MCU=$(grep 'Target MCU' "$FILE_PATH")
    # Read substring from first occurrence of ':' until end
    TARGET_MCU="${TARGET_MCU##*:}"
    # Remove white spaces
    TARGET_MCU=$(echo "$TARGET_MCU" | xargs echo -n)

    JSON="{\"mcu\":\"$TARGET_MCU\",\"lib\":\"$FILE\"},"
    echo "$JSON" >> $OUTPUT_FILE
done

# Remove last ','
$(truncate -s-2 $OUTPUT_FILE)
echo -n "]" >> $OUTPUT_FILE