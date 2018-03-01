#!/bin/sh

echo "*** PRE-COMMIT activated ***"

git reset web/compiled/*
git checkout web/compiled/*