(ns api.endpoints.file
    (:require
     [clojure.java.io :as io]
     [ring.util.response :refer [file-response, response, bad-request]]))


(defn getFilenames []
    (response {:filenames ["some1", "some2", "some3"]}))

(defn getFile [filename]
    (response {:filename filename}))

(defn createFile [filename]
    (response {:filename filename}))

(defn deleteFile [filename]
    (response {:filename filename}))

(defn saveFile [filename, file]
    (response {:filename filename, :file file}))

(defn buildFile [filename, file]
    (response {:filename filename, :file file}))

(defn flashFile [filename, file]
    (response {:filename filename, :file file}))