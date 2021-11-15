(ns api.endpoints.file
    (:require
     [clojure.java.io :as io]
     [ring.util.response :refer [file-response, response, bad-request]]))

(def uploadsDir "/uploads/")

;; PRIVATE

(defn- fileExists [filename]
    (.exists (io/file (str uploadsDir filename))))

(defn- writeFile [filename, data]
    (with-open [w (io/writer (str uploadsDir filename))]
        (.write w data)))

(defn- readFile [filename]
    (slurp (io/file (str uploadsDir filename))))

;; PUBLIC

(defn getFilenames []
    (let [filenames (.list (io/file uploadsDir))]
        (response {:filenames (seq filenames)})))

(defn getFile [filename]
    (cond 
        (not (fileExists filename)) (bad-request "No such file")
        :else (response {:filename filename, :data (readFile filename)})))

(defn createFile [filename]
    (cond 
        (not (.createNewFile (io/file (str uploadsDir filename)))) (bad-request "Filename taken")
        :else (response {:filename filename})))  

(defn deleteFile [filename]
    (cond 
        (not (fileExists filename)) (bad-request "No such file")
        (not (.delete (io/file (str uploadsDir filename)))) (bad-request "Couldn't delete")
        :else (response {:message (str "Deleted " filename)})))

(defn saveFile [filename, data]
    (cond
        (not (fileExists filename)) (bad-request "No such file")
        :else (do (writeFile filename data)
            (response {:message (str "Updated " filename)}))))

(defn buildFile [filename, data]
    (cond
        (not (fileExists filename)) (bad-request "No such file")
        :else (do (writeFile filename data)
            (response {:message (str "Built " filename)}))))

(defn flashFile [filename, data]
    (cond
        (not (fileExists filename)) (bad-request "No such file")
        :else (do (writeFile filename data)
            (response {:message (str "Flashed " filename)}))))