void Dowork(int x,int y,int z){
    int k = 0,j = 0;
    if((x > 3)&&(z < 10)){
        k = x * y - 1;
        j = sqrt(k);
    }
    if((x == 4)||(y > 5)){
        j = x * y + 10; 
    }
    j = j % 3;
}

public int binSearch(int array[],int key){
    int mid,low,high;
    low = 0;
    high = array.length  - 1;
    while (low <= high)
    {
        mid = (low + high) / 2;
        if(Key == array[mid])
            return mid;
        else if (key < array[mid])
            high = mid - 1;
        else
            low = mid + 1;
    }
}