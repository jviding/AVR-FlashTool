#!/bin/bash
AVR_FILES_PATH="/usr/local/include/avr/"
OUTPUT_FILE="mcuLibs.txt"

# Create output file or clear if exists
echo "TargetMCU Lib" > $OUTPUT_FILE

for FILE in $(ls "${AVR_FILES_PATH}")
do
    FILE_PATH="${AVR_FILES_PATH}${FILE}"

    # Read line matching 'Target MCU' from file
    TARGET_MCU=$(grep 'Target MCU' "$FILE_PATH")
    # Read substring from first occurrence of ':' until end
    TARGET_MCU=${TARGET_MCU##*:}
    # Remove white spaces
    TARGET_MCU=$(echo ${TARGET_MCU})

    # Write "<Target MCU> <Lib>" to output file
    echo "$TARGET_MCU $FILE" >> $OUTPUT_FILE
done
