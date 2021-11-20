(ns api.endpoints.mcuLibs
  (:require
   [clojure.java.io :as io]
   [clojure.data.json :as json]
   [ring.util.response :refer [file-response, response, bad-request]]))

;; PRIVATE

(defn- readMcuLibsFile []
  (json/read-str (slurp "/data/mcuLibs.txt")))

;; PUBLIC

(defn getMCULibs []
    (response {:mcuLibs (readMcuLibsFile)}))

