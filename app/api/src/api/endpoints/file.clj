(ns api.endpoints.file
    (:require
     [clojure.java.io :as io]
     [ring.util.response :refer [file-response, response, bad-request]]))

;; PRIVATE

(defn- fileExists [filename]
    (.exists (io/file (str "/uploads/" filename))))

(defn- updateFileData [filename, data]
    (with-open [w (io/writer (str "/uploads/" filename))]
        (.write w data)))

;; PUBLIC

(defn getFilenames []
    (let [filenames (.list (io/file "/uploads/"))]
        (response {:filenames (seq filenames)})))

(defn getFile [filename]
    (response {:filename filename}))

(defn createFile [filename]
    (cond 
        (not (.createNewFile (io/file (str "/uploads/" filename)))) (bad-request "Filename taken")
        :else (response {:filename filename})))  

(defn deleteFile [filename]
    (cond 
        (not (fileExists filename)) (bad-request "No such file")
        (not (.delete (io/file (str "/uploads/" filename)))) (bad-request "Couldn't delete")
        :else (response {:message (str "Deleted " filename)})))

(defn saveFile [filename, data]
    (cond
        (not (fileExists filename)) (bad-request "No such file")
        :else (do (updateFileData filename data)
            (response {:message (str "Updated " filename)}))))

(defn buildFile [filename, data]
    (cond
        (not (fileExists filename)) (bad-request "No such file")
        :else (do (updateFileData filename data)
            (response {:message (str "Built " filename)}))))

(defn flashFile [filename, data]
    (cond
        (not (fileExists filename)) (bad-request "No such file")
        :else (do (updateFileData filename data)
            (response {:message (str "Flashed " filename)}))))