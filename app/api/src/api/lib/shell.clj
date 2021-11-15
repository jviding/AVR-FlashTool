(ns api.lib.shell)


;; $ sudo gpio -g write 22 0
(defn- enableProgrammingMode []
    true)

;;Bring the reset pin up to take the microcontroller out of programming mode:
;; $ sudo gpio -g write 22 1
(defn- disableProgrammingMode []
    true)


;;Compile program code to hex:
;; $ avra main.asm
;; avra <filename>
(defn compileFileForMC [filename]
    true)

;;Flash on microcontroller (here Attiny85):
;; $ avrdude -p attiny85 -c linuxspi -P /dev/spidev0.0 -U flash:w:main.hex:i -b 10000
;; avrdude -p <MC> -c linuxspi -P /dev/spidev0.0 -U flash:w:<hexFile>:i -b 10000
(defn flashFileToMC []
    true)


    ;; (sh "ls" "-aul")

    ;; {:exit 0, 
    ;;  :out "total 64
    ;;   drwxr-xr-x  11 zkim  staff    374 Jul  5 13:21 .
    ;;   drwxr-xr-x  25 zkim  staff    850 Jul  5 13:02 ..
    ;;   -rw-r--r--   1 zkim  staff  12638 Jul  5 13:02 LICENSE.html",
    ;;  :err ""}