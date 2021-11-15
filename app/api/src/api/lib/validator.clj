(ns api.lib.validator)

;; FILENAME
(defn- hasValidName [filename]
  (not (nil? (re-matches #"^[a-zA-Z0-9_-]{3,24}\.[a-zA-Z0-9]{1,5}$" filename))))

(defn- hasValidExtension [filename] 
  (not (nil? (re-matches #"^.+\.(asm)$" filename))))

(defn isValidFilename [filename]
  (cond (not (hasValidName filename)) false
        (not (hasValidExtension filename)) false
        :else true))


;; FILE VALIDATION

;;TODO:
;; 1. Virus scan ?

(defn- hasAllowedSize [file]
  (let [megabyte 1048576
        maxSize (* megabyte 5)
        fileSize (.length (get file :tempfile))]
    (< fileSize maxSize)))

(defn isValidFileData [data]
  true)