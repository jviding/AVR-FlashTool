(ns api.endpoints.mcuLibs
  (:require
   [clojure.java.io :as io]
   [ring.util.response :refer [file-response, response, bad-request]]))

;; PRIVATE

(defn- readMcuLibsFile []
  (slurp "/data/mcuLibs.txt"))

;; PUBLIC

(defn getMCULibs []
    (response {:mcuLibs (readMcuLibsFile)}))

