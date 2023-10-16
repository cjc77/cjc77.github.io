#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <notebook_src_dir> <html_dest_dir>"
  exit 1
fi

# Assign command-line arguments to variables
notebook_src_dir="$1"
html_dest_dir="$2"

# Check if the source directory exists
if [ ! -d "$notebook_src_dir" ]; then
  echo "Error: Source directory '$notebook_src_dir' does not exist."
  exit 1
fi

# Create the destination directory if it doesn't exist
mkdir -p "$html_dest_dir"

# Loop through each .ipynb file in the source directory and convert it to HTML
for nb in "$notebook_src_dir"/*.ipynb; do
  jupyter nbconvert --to html --output-dir="$html_dest_dir" "$nb"
done

# Loop through each .html file in the destination directory and update links
for html_file in "$html_dest_dir"/*.html; do
  sed -i 's/\(\.ipynb\)/.html/g' "$html_file"
done


echo "Export complete. HTML files are in '$html_dest_dir'."
